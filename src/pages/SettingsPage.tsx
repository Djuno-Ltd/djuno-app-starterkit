import Profile from "../components/profile";

export default function SettingsPage() {
  return (
    <div>
      <div
        className={`py-10 px-12 border-b-2 border-slate-100 text-2xl text-slate-700`}
      >
        <p>Personal Account Settings</p>
      </div>
      <div className="flex flex-wrap">
        <div className={"w-full md:w-2/6 "}>
          <Profile />
        </div>
      </div>
    </div>
  );
}
