import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import {
  deleteProfile,
  editProfile,
  getProfile,
} from "../../redux/slices/AuthSlice";
import { cancelSubscription } from "../../redux/slices/RazorpaySlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.data);
  const [data, setData] = useState({
    previewImage: userData.avatar?.secure_url,
    name: userData.name,
    avatar: undefined,
    userId: userData._id,
    haschanges: false,
  });

  function handleImage(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadImage,
          haschanges: true,
        });
      });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      haschanges: true,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("avatar", data.avatar);
    await dispatch(editProfile(formdata));
    await dispatch(getProfile());
  }

  async function onDelete(e) {
    e.preventDefault();
    const res = await dispatch(deleteProfile(data.userId));
    if (res?.payload?.success) {
      navigate("/signup");
    }
  }

  async function handleCancel(e) {
    e.preventDefault();
    const res = await dispatch(cancelSubscription());
    if (res?.payload?.success) {
      await dispatch(getProfile());
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center lg:h-screen mb-10">
        <form
          onSubmit={onFormSubmit}
          className="
            lg:w-[60%] w-[95%] flex flex-col gap-8
            rounded-2xl px-8 py-10
            shadow-xl
            bg-white/10 backdrop-blur-2xl border border-white/20
            transition-all duration-300
          "
        >
          {/* Profile Image */}
          <div className="flex items-center justify-center w-full">
            <div className="relative group">
              <img
                src={data.previewImage || "/placeholder.svg"}
                alt="profile photo"
                className="rounded-full w-32 h-32 object-cover ring-4 ring-yellow-400/50 shadow-md"
              />
              <input
                type="file"
                id="imageUpload"
                accept=".jpg, .jpeg, .png, .svg"
                className="hidden"
                onChange={handleImage}
              />
              <label
                htmlFor="imageUpload"
                className="
                  absolute bottom-2 right-0 rounded-full 
                  bg-yellow-400 text-black w-8 h-8 
                  flex items-center justify-center cursor-pointer
                  shadow-md transition-all duration-200
                  group-hover:scale-110
                "
              >
                <FiEdit size={18} />
              </label>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 w-full">
            <div className="flex w-full relative">
              <label
                htmlFor="name"
                className="absolute bg-background px-1 text-xs -top-2 left-5 text-gray-300"
              >
                Name *
              </label>
              <input
                className="h-12 w-full font-semibold px-4 py-2 rounded-lg border border-gray-500/40 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none capitalize"
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex w-full relative">
              <label
                htmlFor="email"
                className="absolute bg-background px-1 text-xs -top-2 left-5 text-gray-300"
              >
                Email *
              </label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={userData?.email}
                className="h-12 w-full font-semibold px-4 py-2 rounded-lg border border-gray-500/40 bg-gray-800/30 text-gray-400 outline-none"
                disabled
              />
            </div>

            <div className="flex relative">
              <label
                htmlFor="role"
                className="absolute bg-background px-1 text-xs -top-2 left-5 text-gray-300"
              >
                Role *
              </label>
              <input
                type="text"
                name="role"
                id="role"
                defaultValue={userData?.role}
                className="h-12 w-full font-semibold px-4 py-2 rounded-lg border border-gray-500/40 bg-gray-800/30 text-gray-400 capitalize outline-none"
                disabled
              />
            </div>

            <div className="flex relative">
              <label
                htmlFor="subscription"
                className="absolute bg-background px-1 text-xs -top-2 left-5 text-gray-300"
              >
                Subscription *
              </label>
              <input
                type="text"
                name="subscription"
                id="subscription"
                defaultValue={
                  userData.subscription?.status === "active"
                    ? "Active"
                    : "Inactive"
                }
                className="h-12 w-full font-semibold px-4 py-2 rounded-lg border border-gray-500/40 bg-gray-800/30 text-gray-400 capitalize outline-none"
                disabled
              />
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex lg:flex-row flex-col gap-6 items-center">
            <Link to={"/profile/changePassword"} className="w-full lg:w-fit">
              <button
                type="button"
                className="w-full lg:w-fit px-6 py-3 rounded-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-300 transition-all shadow-md"
              >
                Change Password
              </button>
            </Link>

            <button
              className={`w-full lg:w-fit px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
                data.haschanges
                  ? "bg-green-500 hover:bg-green-400 text-white"
                  : "bg-gray-500/40 text-gray-300 cursor-not-allowed"
              }`}
              disabled={!data.haschanges}
              type="submit"
            >
              Save Changes
            </button>

            <button
              className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition-all"
              onClick={onDelete}
            >
              <FiTrash2 />
              Delete Account
            </button>
          </div>

          {/* Cancel Subscription */}
          {userData.subscription?.status === "active" && (
            <button
              onClick={handleCancel}
              className="w-full px-6 py-3 rounded-lg font-semibold bg-red-500 hover:bg-red-400 text-white transition-all shadow-md"
            >
              Cancel Subscription
            </button>
          )}
        </form>
      </div>
    </HomeLayout>
  );
}

export default Profile;
