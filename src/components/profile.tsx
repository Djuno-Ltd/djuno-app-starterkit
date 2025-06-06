import Input from "../components/input";
import Button from "../components/button";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { toBase64 } from "../utils/file";
import toast from "react-hot-toast";
import { ReactComponent as OkIcon } from "./../assets/icons/ok.svg";
import BlankAvatarImg from "../assets/images/blank-avatar.png";
import classNames from "classnames";
import Loading from "../components/loading";
import styles from "./../styles/Settings.module.scss";
import { useWeb3Auth } from "@djuno/web3auth-hook";
import { getStorage } from "../utils/helper";

function ProfileComponent() {
  const {
    getProfile,
    updateProfile,
    getProfileAvatar,
    saveProfileAvatar,
    profile,
    profileAvatar,
    loading,
  } = useWeb3Auth();

  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(profileAvatar);
  const [fullname, setFullname] = useState<string>(profile?.Name || "");
  const [email, setEmail] = useState<string>(profile?.Email || "");

  useEffect(() => {
    getProfile(getStorage("token"));
    getProfileAvatar(getStorage("token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFullname(profile?.Name || "");
    setEmail(profile?.Email || "");
  }, [profile?.Email, profile?.Name]);

  useEffect(() => {
    console.log(profileAvatar);
    setAvatar(profileAvatar);
  }, [profileAvatar]);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      try {
        const formData = new FormData();
        formData.set("img", files[0]);
        const file = await toBase64(files[0]);
        saveProfileAvatar(getStorage("token"), formData as any);
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

  const handleSave = useCallback(async () => {
    if (!fullname && !email) return;
    try {
      await updateProfile(getStorage("token"), {
        Name: fullname,
        Email: email,
      });
      await getProfileAvatar(getStorage("token"));
    } catch (e: any) {
      toast.error(e?.data || "Something went wrong!");
    }
  }, [email, fullname, getProfileAvatar, updateProfile]);

  return (
    <>
      {loading.profile && (
        <div style={{ height: 400, display: "flex", alignItems: "center" }}>
          <Loading />
        </div>
      )}
      {!loading.profile && (
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
                [styles.ok]: profile?.confirmation === null && profile.Email,
              }
            )}
            style={{ position: "relative" }}
          >
            <Input
              placeholder="Email"
              fullWidth={true}
              onChange={handleChangeEmail}
              value={email}
              disabled={profile?.confirmation === null && !!profile?.Email}
            />
            {profile?.confirmation === null && profile.Email && <OkIcon />}
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
