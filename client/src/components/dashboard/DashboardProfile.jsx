import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import Avatar from "../Avatar";
import Input from "../Input";
import Label from "../Label";
import Button from "../Button";
import { app } from "../../firebase/firebase";

import { useSelector } from "react-redux";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { MdInsertPhoto } from "react-icons/md";
import Alert from "../Alert";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  // 使用狀態管理是否已暫存檔案
  const [imgFile, setImgFile] = useState(null);

  // 使用臨時 URL 渲染上傳的圖片至 `Avatar` 組件
  const [imgFileUrl, setImgFileUrl] = useState(null);

  // 透過 ref 綁定 DOM el 防止重渲染後就消失
  const filePickerRef = useRef();

  // 使用狀態儲存圖片上傳進度
  const [imgFileUploadProgress, setImgFileUploadProgress] = useState(null);
  const [imgFileUploadError, setImgFileUploadError] = useState(null);
  console.log(imgFileUploadProgress, imgFileUploadError);

  // handle 照片暫存
  const handleImgChange = (e) => {
    // 先確認上傳的 `truthy`, `falsy`
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgFileUrl(URL.createObjectURL(file));
    }
  };
  // console.log(imgFile, imgFileUrl);

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

    // 存取 firebase DB
    const storage = getStorage(app);

    // 為即將上傳的檔案命名
    const fileName = new Date().getTime() + imgFile.name;
    // 持久化存取到的 firebase DB 並同時賦予檔案名稱
    const storageRef = ref(storage, fileName);
    // 傳入暫存的檔案指向 firebase DB
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed", //
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
          "Image couldn't be uploaded (File must be image files less than 10mb)"
        );
      },
      // 確認檔案上傳至 firebase DB 後存取 URL -> 將 `imgFileUrl` state 改變
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <Container>
      <h1 className="text-center text-2xl font-semibold">Profile</h1>
      <form className="w-72 md:w-96 flex flex-col items-center gap-5">
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
          className="group w-32 h-32 border-4 border-borderSecondary rounded-full overflow-hidden cursor-pointer "
        >
          <div
            className={`relative group-hover:opacity-85 overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <MdInsertPhoto
              className={`group-hover:absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-grey
              }`}
            />
            <Avatar
              imgSrc={imgFileUrl || currentUser.profilePicture}
              className=" shadow-md"
            />
          </div>
        </div>

        {imgFileUploadError && <Alert msg={imgFileUploadError} />}

        {/* Username */}
        <div className="w-full">
          <Label content="Username" />
          <Input
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
            id="email"
            type="email"
            placeholder="Username"
            defaultValue={currentUser.email}
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <Label content="Password" />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            defaultValue=""
          />
        </div>

        <Button
          type="submit"
          label="Update"
          className="w-full hover:text-whitesmoke border-2 border-primary hover:bg-primary"
        />

        <div className="w-full flex justify-between">
          <Button
            label="Delete Account"
            className="text-warning border-2 border-warning hover:bg-warning hover:text-white"
          />
          <Button label="Sign Out" className="border-2 border-primary" />
        </div>
      </form>
    </Container>
  );
};

export default DashboardProfile;
