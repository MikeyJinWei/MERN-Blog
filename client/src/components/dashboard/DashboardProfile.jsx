import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import Avatar from "../Avatar";
import Input from "../Input";
import Label from "../Label";
import Button from "../Button";
import Alert from "../Alert";
import { Modal } from "flowbite-react";

import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";

import { app } from "../../firebase/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { MdInsertPhoto } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { TbExclamationCircle } from "react-icons/tb";

const DashboardProfile = () => {
  const [visible, setVisible] = useState(false);
  // 使用狀態管理是否已暫存檔案
  const [imgFile, setImgFile] = useState(null);
  // 使用臨時 URL 渲染上傳的圖片至 `Avatar` 組件
  const [imgFileUrl, setImgFileUrl] = useState(null);
  // 狀態管理圖片上傳
  const [imgFileUploadProgress, setImgFileUploadProgress] = useState(null); // 進度條
  const [imgFileUploadError, setImgFileUploadError] = useState(null); // 上傳錯誤
  const [imgFileUploading, setImgFileUploading] = useState(false); // 給 Client 的上傳狀態
  // 給 Client 的 `form` 的提交狀態
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null); // 成功信息
  const [updateUserError, setUpdateUserError] = useState(null); // 錯誤信息
  // 狀態儲存 `form` 資料
  const [formData, setFormData] = useState({});
  // 狀態管理刪除用戶用 Modal
  const [showModal, setShowModal] = useState(false);

  // 透過 ref 綁定 DOM el 防止重渲染後就消失
  const filePickerRef = useRef();
  // 存取 Redux 的 `user` state
  const { currentUser } = useSelector((state) => state.user);
  // 初始化 `useDispatch()` hook
  const dispatch = useDispatch();

  // handle password 開關 icon
  const handleVisible = (e) => {
    setVisible(!visible);
  };

  // handle 照片暫存
  const handleImgChange = (e) => {
    // 先確認上傳的 `truthy`, `falsy`
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgFileUrl(URL.createObjectURL(file));
    }
  };

  // 使用 effect 觸發照片檔上傳的 `function`
  useEffect(() => {
    // 確認當前是否有暫存的照片檔案
    if (imgFile) {
      uploadImg();
    }
  }, [imgFile]); // dependencies 為 `imgFile` state

  // 實際上傳照片檔的 `function`
  const uploadImg = async () => {
    // console.log("Uploading img...");
    /* 
    rules_version = '2';

    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read;
          allow write: if
          // 限制檔案的 `write` 只能來自 req
          request.resource.size < 10 * 1024 * 1024 && // 檔案大小 < 10mb (byte -> kilobyte -> megabyte)
          request.resource.contentType.matches('image/.*') // 副檔只能是圖片檔
        }
      }
    }
    */
    setImgFileUploading(true); // 讓 Client 知道開始上傳照片
    // 清空上次報出的錯誤
    setImgFileUploadError(null);

    // 存取 firebase DB
    const storage = getStorage(app);

    // 為即將上傳的檔案命名
    const fileName = new Date().getTime() + imgFile.name;
    // 持久化存取到的 firebase DB 並同時賦予檔案名稱
    const storageRef = ref(storage, fileName);
    // 傳入暫存的檔案指向 firebase DB
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      // 使用 `snapshot` variable 存取上傳任務的狀態
      (snapshot) => {
        // 紀錄上傳進度
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgFileUploadProgress(progress.toFixed(0)); // 傳入 `0` 至 `toFixed()` method  清除小數點
      },
      // 處理錯誤
      (error) => {
        setImgFileUploadError(
          // 不需向 Client res `error` 接收到的錯誤，告知檢查檔案大小及副檔名即可
          "Uploaded failed (File must be image less than 10mb)"
        );
        // 發生錯誤時
        setImgFileUploadProgress(null); // 上傳進度設為空值
        setImgFile(null); // 檔案緩存設為空值
        setImgFileUrl(null); // URL設為空值
        setImgFileUploading(false);
      },
      // 確認檔案已上傳至 firebase DB
      () => {
        // 存取 URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFileUrl(downloadURL); // 改變 `imgFileUrl` state
          // 賦予新 Avatar 的 URL 給 `formData` 的 `profilePicture` key
          setFormData({ ...formData, profilePicture: downloadURL });
          setImgFileUploading(false);
        });
      }
    );
  };

  // handle `input` 變化
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle `form` 資料提交
  const handleSubmit = async (e) => {
    e.preventDefault(); // 避免提交重整
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    // 排除提交空值
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    // 避免還在上傳照片時再次發出 Req
    if (imgFileUploading) {
      setUpdateUserError("Please wait before finishing image upload");
      return;
    }
    try {
      dispatch(updateStart()); // 開始更新
      // 發出 JSON 請求 -> `res` variable 儲存自後端的 respond
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); // 將 res 轉換成 JS 儲存
      if (!res.ok) {
        dispatch(updateFailure(data.message)); // 存取 `res` 的錯誤信息
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data)); // 賦予 `data` 給 payload
        setUpdateUserSuccess("User's profile updated successfully"); // 告知 Client 成功信息
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  // handle 刪除使用者
  const handleDeleteUser = () => {};

  return (
    <Container>
      <h1 className="mb-3 text-center text-2xl font-semibold">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="w-72 mb-5 md:w-96 flex flex-col items-center gap-5"
      >
        {/* Heading */}

        {/* Img picker */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImgChange}
          // 使用此 el 儲存 ref 使資料不消失
          ref={filePickerRef}
          hidden // 隱藏 el
        />

        {/* Avatar */}
        <div
          // 使用 `click()` 在此 el 模擬對 `<input>` 的點擊
          onClick={() => filePickerRef.current.click()}
          className={`relative group w-32 h-32 border-4 border-borderSecondary rounded-full bg-ghost overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${
            imgFileUploadProgress && imgFileUploadProgress < 100 && "opacity-85"
          }`}
        >
          {imgFileUploadProgress && (
            <CircularProgressbar
              value={imgFileUploadProgress || 0}
              text={`${imgFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                },
                path: {
                  stroke: `rgba(56, 189, 248, ${imgFileUploadProgress / 100})`,
                },
                text: {
                  fill: "rgb(56 189 248)",
                },
              }}
            />
          )}
          <Avatar
            imgSrc={imgFileUrl || currentUser.profilePicture}
            className={`shadow-md group-hover:opacity-85 ${
              imgFileUploadProgress &&
              imgFileUploadProgress < 100 &&
              "opacity-85"
            }`}
          />
          <MdInsertPhoto className="group-hover:absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-dark opacity-100" />
        </div>

        {imgFileUploadError && <Alert msg={imgFileUploadError} />}

        {/* Username */}
        <div className="w-full">
          <Label content="Username" />
          <Input
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <Label content="Email" />
          <Input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Username"
            defaultValue={currentUser.email}
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <Label content="Password" />
          <div className="flex">
            <Input
              onChange={handleChange}
              id="password"
              type={visible ? "text" : "password"}
              placeholder="Password"
              className="placeholder:text-secondary"
            />
            <span
              className="relative flex justify-around text-2xl"
              onClick={handleVisible}
            >
              {visible ? (
                <IoMdEye className="absolute top-3 right-4 cursor-pointer" />
              ) : (
                <IoMdEyeOff className="absolute top-3 right-4 cursor-pointer" />
              )}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          label="Update"
          className="w-full hover:text-whitesmoke border-2 border-primary hover:bg-primary"
        />
      </form>
      <div className="w-full flex justify-between">
        <Button
          onClick={() => setShowModal(true)} // 開啟刪除帳號的 Modal
          label="Delete Account"
          className="text-neutral-50 border-2 border-warning bg-warning"
        />
        <Button
          label="Sign Out"
          className="border-2 border-primary bg-primary text-whitesmoke"
        />
      </div>
      {updateUserSuccess && (
        <Alert
          msg={updateUserSuccess}
          className="mt-5 text-emerald-600 bg-green-100"
        />
      )}
      {updateUserError && <Alert msg={updateUserError} className="mt-5" />}

      {/* Delete User Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="md"
        popup
      >
        <Modal.Header className="" />
        <Modal.Body className="text-neutral-600 dark:text-neutral-50">
          <div className="text-center">
            <TbExclamationCircle className="w-14 h-14 mx-auto mb-5" />
            <h3 className="mb-5 text-lg">
              Are you sure you want to delete your account?
            </h3>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handleDeleteUser}
              label="Yes, I'm sure"
              className="text-neutral-50 bg-warning"
            />
            <Button
              onClick={() => {}}
              label="No, thanks"
              className="bg-ghost"
            />
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DashboardProfile;
