import React from "react";
import Input from "../components/input";
import Button from "../components/button";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { detectMimeType, toBase64 } from "../utils/file";
import toast from "react-hot-toast";
import {
  fetchProfile,
  selectProfile,
  selectLoading,
  saveProfile,
  saveProfileAvatar,
  fetchProfileImage,
  setProfile,
} from "../store/profileSlice";
import { ReactComponent as OkIcon } from "./../assets/icons/ok.svg";
import { ReactComponent as WarningIcon } from "./../assets/icons/warning.svg";
import BlankAvatarImg from "../assets/images/blank-avatar.png";
import classNames from "classnames";
import Loading from "../components/loading";
import styles from "./../styles/Settings.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks";

function ProfileComponent() {
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>();
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchProfile()).then(() => {
      dispatch(fetchProfileImage());
    });
  }, [dispatch]);

  useEffect(() => {
    setAvatar(() => {
      if (!profile.avatar) return undefined;
      return profile.avatar;
    });
    setFullname(profile.name || "");
    setEmail(profile.email || "");
  }, [profile.avatar, profile.email, profile.name]);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      try {
        const formData = new FormData();
        formData.set("img", files[0]);
        const file = await toBase64(files[0]);
        dispatch(saveProfileAvatar({ formData }));
        setAvatar(file);
      } catch (e) {}
    }
  };

  const handleChangeFullname = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFullname(e.target.value);
    },
    []
  );

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  // const confirmEmail = useCallback(async () => {
  //   try {
  //     await djibConn.resendVerificationEmail();
  //     toast.success("An email has been sent. Please check your inbox.");
  //   } catch (e) {
  //     toast.error("Something went wrong!");
  //   }
  // }, [djibConn]);

  const handleSave = useCallback(async () => {
    if (
      (profile.email &&
        profile.confirmation === null &&
        !fullname &&
        !avatar) ||
      (!fullname && !avatar && !email)
    )
      return;
    try {
      dispatch(saveProfile({ name: fullname, email })).then((action) => {
        if (action.type === "fulfilled") {
          dispatch(
            setProfile({
              name: fullname,
              email,
            })
          );
        }
      });
    } catch (e: any) {
      toast.error(e?.data || "Something went wrong!");
    }
  }, [avatar, dispatch, email, fullname, profile.confirmation, profile.email]);

  // const handleResendEmail = useCallback(async () => {
  //   await confirmEmail();
  // }, [confirmEmail]);

  return (
    <>
      {loading && (
        <div style={{ height: 400, display: "flex", alignItems: "center" }}>
          <Loading />
        </div>
      )}
      {!loading && (
        <div className="flex items-center py-8 px-4 flex-col max-w-xs m-auto gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden cursor-pointer">
            <img
              className="object-cover"
              src={avatar || BlankAvatarImg}
              alt="Avatar"
              width={100}
              height={100}
              onClick={() => avatarRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={avatarRef}
              onChange={handleChangeFile}
            />
          </div>
          <Input
            placeholder="Fullname"
            fullWidth={true}
            onChange={handleChangeFullname}
            value={fullname}
          />
          <div
            className={classNames(
              "flex w-full items-center gap-2 flex-wrap",
              styles.email,
              {
                [styles.ok]: profile.confirmation === null && profile.email,
              }
            )}
            style={{ position: "relative" }}
          >
            <Input
              placeholder="Email"
              fullWidth={true}
              onChange={handleChangeEmail}
              value={email}
              disabled={profile.confirmation === null && !!profile.email}
            />
            {profile.confirmation === null && profile.email && <OkIcon />}

            {/* {profile.email && profile.confirmation !== null && (
              <>
                <WarningIcon />
                <Button
                  extraLight={true}
                  withLoading={true}
                  style={{
                    fontSize: "0.8rem",
                  }}
                >
                  Resend email
                </Button>
              </>
            )} */}
          </div>

          <Button withLoading={true} onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </>
  );
}

export default ProfileComponent;
