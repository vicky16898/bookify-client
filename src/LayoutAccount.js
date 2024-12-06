import { Outlet } from "react-router";
import AccountPage from "./pages/AccountPage";

export default function AccountLayout() {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex flex-col">
            <AccountPage />
            <main className="pt-24 p-4">
                <Outlet />
            </main>
        </div>
    );
}
