import React from "react";
import Container from "../Container";
import Avatar from "../Avatar";
import Input from "../Input";
import Label from "../Label";
import Button from "../Button";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <form className="w-80 md:w-96 flex flex-col items-center gap-5">
        {/* Heading */}
        <h1 className="text-center text-2xl font-semibold">Profile</h1>

        {/* Avatar */}
        <div className="w-32 h-32 cursor-pointer">
          <Avatar
            imgSrc={currentUser.profilePicture}
            className=" shadow-md overflow-hidden"
          />
        </div>

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
          className="w-full hover:text-btnPrimaryText border-2 border-btnPrimary bg-transparent hover:bg-btnPrimary"
        />

        <div className="w-full flex justify-between">
          <Button
            label="Delete Account"
            className="text-btnWarning border border-btnWarning hover:bg-btnWarning hover:text-btnPrimaryText"
          />
          <Button label="Sign Out" className="bg-btnDefault" />
        </div>
      </form>
    </Container>
  );
};

export default DashboardProfile;
