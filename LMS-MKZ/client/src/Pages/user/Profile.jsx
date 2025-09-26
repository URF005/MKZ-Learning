import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteProfile,
  editProfile,
  getProfile,
} from "../../redux/slices/AuthSlice";

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

  return (
    <HomeLayout>
      <div className="flex justify-center items-center lg:h-screen mb-10 px-4 font-mulish">
        <form
          onSubmit={onFormSubmit}
          className="
            w-full max-w-3xl flex flex-col gap-8
            rounded-2xl px-6 py-8 sm:px-10 sm:py-12
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
                className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover ring-4 ring-[#E4B122]/50 shadow-md"
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
                  bg-[#E4B122] text-black w-8 h-8 
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
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 w-full">
            <div className="flex w-full relative">
              <label
                htmlFor="name"
                className="absolute bg-background px-1 text-xs -top-2 left-4 text-gray-300"
              >
                Name *
              </label>
              <input
                className="h-12 w-full font-semibold px-4 py-2 rounded-lg border border-gray-500/40 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-[#E4B122] outline-none capitalize"
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
                className="absolute bg-background px-1 text-xs -top-2 left-4 text-gray-300"
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
                className="absolute bg-background px-1 text-xs -top-2 left-4 text-gray-300"
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
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col sm:flex-row gap-6 items-center">
            <Link to={"/profile/changePassword"} className="w-full sm:w-fit">
              <button
                type="button"
                className="w-full sm:w-fit px-6 py-3 rounded-lg font-semibold text-black bg-[#E4B122] hover:bg-[#c9971a] transition-all shadow-md"
              >
                Change Password
              </button>
            </Link>

            <button
              className={`w-full sm:w-fit px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${data.haschanges
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

          {/* Important Notice */}
          <div className="mt-6 p-4 rounded-lg border border-yellow-400 bg-yellow-100/20 text-yellow-200 shadow-md">
            <h3 className="font-bold text-yellow-300 text-lg mb-2">
              Important Notice
            </h3>
            <p className="text-sm">
              After changing your password or Deleting account, please{" "}
              <strong>clear your browser cache and cookies</strong> before
              logging in again. This ensures your session updates properly with
              the new credentials or new SignUp.
            </p>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Profile;
