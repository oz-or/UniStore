"use client";

import { useEffect, useState } from "react";
import HeaderAndEdit from "./HeaderAndEdit";
import ChangePassword from "@/components/account/profile/ChangePassword";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@/contexts/UserContext/UserContext";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { user, loading, setLoading, setUser } = useUser();
  const [imageUrl, setImageUrl] = useState<string>("");

  const [showChangePassword, setShowChangePassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [cityState, setCityState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [taxId, setTaxId] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setImageUrl(user.user_metadata.profile_picture || "/User.svg");
      setFirstName(user.user_metadata.first_name || "");
      setLastName(user.user_metadata.last_name || "");
      setEmail(user.email || "");
      setPhone(user.user_metadata.phone || "");
      setCountry(user.user_metadata.country || "");
      setCityState(user.user_metadata.cityState || "");
      setPostalCode(user.user_metadata.postalCode || "");
      setTaxId(user.user_metadata.taxId || "");
    }
  }, [user]);

  const handlePasswordChange = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("User is not authenticated.");
      return;
    }

    if (!isEditing) setIsEditing(true);

    if (isEditing) {
      if (
        !firstName ||
        !lastName ||
        !phone ||
        !country ||
        !cityState ||
        !postalCode ||
        !taxId
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      setLoading(true);
      try {
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            country,
            cityState,
            postalCode,
            taxId,
          },
        });

        if (updateError) {
          throw updateError;
        }

        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            first_name: firstName,
            last_name: lastName,
            phone,
            country,
            cityState,
            postalCode,
            taxId,
          },
        });

        toast.success("Profile successfully edited!");
      } catch (error) {
        console.error("Error updating user profile:", error);
        toast.error("Failed to update profile. Please try again.");
      } finally {
        setLoading(false);
        setIsEditing(false);
      }
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = e.target.files[0];

      const { data: existingImages, error: fetchError } = await supabase.storage
        .from("profile-pictures")
        .list(`${user?.id || ""}/`);

      if (fetchError) {
        throw fetchError;
      }

      if (existingImages && existingImages.length > 0) {
        const deletePromises = existingImages.map((img) =>
          supabase.storage
            .from("profile-pictures")
            .remove([`${user?.id || ""}/${img.name}`])
        );

        await Promise.all(deletePromises);
      }

      const { data: image, error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(`${user?.id || ""}/${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }

      if (image) {
        console.log(image);
      }

      const { data: imgUrl } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(`${user?.id || ""}/${file.name}`);

      if (imgUrl) {
        setImageUrl(imgUrl.publicUrl);

        const { error: updateError } = await supabase.auth.updateUser({
          data: { profile_picture: imgUrl.publicUrl },
        });

        if (updateError) {
          console.error("Error updating user profile picture:", updateError);
        } else {
          if (user && user.id) {
            setUser({
              ...user,
              id: user.id,
              user_metadata: {
                ...user.user_metadata,
                profile_picture: imgUrl.publicUrl,
              },
            });
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2  1024:pb-20 1024:mx-8 1440:mr-0">
      <Toaster />
      <section id="myProfile" className="grid gap-y-4 500:gap-y-7 ">
        <h1 className="font-semibold ml-2 500:text-base translate-y-[4px] 750:text-lg 500:translate-y-4 1200:text-2xl 1200:mb-6 1440:text-[26px] 1440:translate-y-6">
          My Profile
        </h1>
        <div className="flex justify-between shadow-account-rectangle bg-white p-3 1200:p-7 rounded 500:p-5  ">
          <div className="flex gap-x-2.5 500:gap-x-4 1200:gap-x-6">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Profile picture"
                className=" w-11 500:w-16 750:w-[72px] 1200:w-[84px] 1440:w-24 h-11  500:h-16 750:h-[72px] 1200:h-[84px] 1440:h-24"
              />
              <label
                htmlFor="profilePicture"
                className="absolute w-11 500:w-16 750:w-[72px] 1200:w-[84px] 1440:w-24 h-11  500:h-16 750:h-[72px] 1200:h-[84px] 1440:h-24 inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer"
              >
                <span className="text-[8px] 500:text-xs font-semibold 1200:text-base text-white">
                  Change
                </span>
                <input
                  type="file"
                  id="profilePicture"
                  onChange={uploadImage}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col 500:gap-y-1.5 1440:gap-y-2.5">
              <span className="font-semibold text-[13px] 500:text-base 750:text-lg 1200:text-xl 1440:text-2xl">
                {firstName} {lastName}
              </span>
              <div className="text-[9px] opacity-75 500:text-xs flex flex-col  gap-y-0.5 500:gap-y-1 750:gap-y-2 1200:text-sm 1440:gap-y-3">
                <span>{email}</span>
                <span>Los Angeles, California, USA</span>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handlePasswordChange}
              className="flex shadow-account-rectangle bg-white px-1 py-0.5 items-center translate-y-[2px] "
            >
              <img
                src="/account/pencil-edit.png"
                alt="Edit"
                className="w-2 mr-1 ml-0.5 750:w-[11px] 1440:w-3"
              />
              <span className="opacity-75 text-[7px] 500:text-[10px] 500:text-[13px] 750:text-xs 1440:text-[13px]">
                Change Password
              </span>
            </button>
          </div>
        </div>
        {showChangePassword && (
          <div className="shadow-account-rectangle bg-white p-3 500:p-5 1024:p-7 rounded transition-all duration-500 ">
            <ChangePassword
              showChangePassword={showChangePassword}
              setShowChangePassword={setShowChangePassword}
            />
          </div>
        )}
        <div className="shadow-account-rectangle bg-white p-3 500:p-5 1024:p-7 rounded">
          <HeaderAndEdit
            header={"Account Information"}
            handleEdit={handleSave}
            isEditing={isEditing}
            loading={loading}
          />
          <form className="grid grid-cols-[repeat(2,_125px)] gap-x-8 500:grid-cols-[repeat(2,_180px)] gap-y-3 500:gap-y-4 750:gap-y-8 750:grid-cols-[repeat(2,_250px)]">
            <div className="text-[10px] 500:text-[13px] mb-2 flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="firstName"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2 ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent   disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px] 1200:text-[15px]"
              />
            </div>
            <div className="text-[10px] 500:text-[13px] mb-2 flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="lastName"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent    disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px] 1200:text-[15px]"
              />
            </div>
            <div className="text-[10px] 500:text-[13px] flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="email"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent    disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px] 1200:text-[15px]"
              />
            </div>
            <div className="text-[10px] 500:text-[13px] flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="phone"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent    disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[12px] 1200:placeholder:text-sm"
              />
            </div>
          </form>
        </div>
        <div className="shadow-account-rectangle bg-white p-3 500:p-5 1024:p-7 rounded">
          <HeaderAndEdit header={"Address"} />
          <form className="grid grid-cols-[repeat(2,_125px)] gap-x-8 500:grid-cols-[repeat(2,_180px)] gap-y-3 500:gap-y-4 750:gap-y-8 750:grid-cols-[repeat(2,_250px)]">
            <div className="text-[10px] 500:text-[13px] flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="country"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!isEditing}
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent    disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px] 1200:text-[15px] 1200:text-[15px]"
              />
            </div>
            <div className="text-[10px] 500:text-[13px] flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="cityState"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                City/State
              </label>
              <input
                type="text"
                id="cityState"
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                disabled={!isEditing}
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent    disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px] 1200:text-[15px] 1200:text-[15px]"
              />
            </div>
            <div className="text-[10px] 500:text-[13px] flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="postalcode"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalcode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your postal code"
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent    disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px] 1200:text-[15px] 1200:text-[15px]"
              />
            </div>

            <div className="text-[10px] 500:text-[13px] flex flex-col 500:gap-y-1 1200:gap-y-2">
              <label
                htmlFor="taxId"
                className="text-[9px] opacity-60 h-4 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                TAX ID
              </label>
              <input
                type="text"
                id="taxId"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your TAX ID"
                className="h-4 placeholder:text-[9px] 500:h-6 pl-[3px] disabled:pl-0 750:h-[28px] flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent    disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px] 1200:text-[15px] 1200:text-[15px]"
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Profile;
