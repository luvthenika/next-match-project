"use client";
import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { usePresenceChannel } from "app/hooks/usePresenceChannel";
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import * as Ably from 'ably';

export const Provider = ({ children }: { children: ReactNode }) => {
 //const channel =  usePresenceChannel();
 return (
    <NextUIProvider>

        {children}

    </NextUIProvider>
  );
};
