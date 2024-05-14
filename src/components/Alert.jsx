import { useAppContext } from "../context/appContext";

export default function Alert() {
  const { alertType, alertText } = useAppContext();
  return (
    <div className={`${alertType === "success" ? "text-green-500" : "text-red-500"} `}>
      {alertText}
    </div>
  );
}
