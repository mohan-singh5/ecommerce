"use client";

import { Provider } from "react-redux";
import { store } from "./features/store";

export default function StoreProvier({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
