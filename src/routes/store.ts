import { load } from "@tauri-apps/plugin-store";
import { writable } from "svelte/store";

const store = await load("store.js", { autoSave: true });
const walletStore = await store.get<number>("wallet");
export const wallet = writable<number>(walletStore != undefined ? walletStore : 0);

export const walletCredit = async (amount: number) => {
    // @ts-ignore
    wallet.update((value) => {
        value += amount;
        store.set("wallet", value)
        return value
    })
}

export const walletPay = async (amount: number) => {
    let is_succesful = false;
    // @ts-ignore
    wallet.update((value) => {
        if (value >= amount) {
            value -= amount;
            store.set("wallet", value);
            is_succesful = true;
        }
        return value
    })
    return is_succesful
}

const isOnboardingStore = await store.get<boolean>("is_onboarding");
export const isOnboarding = writable<boolean>(isOnboardingStore != undefined ? isOnboardingStore : true);

export const setOnboarding = async (onboarded: boolean) => {
    await store.set("is_onboarding", onboarded);
    isOnboarding.set(onboarded);
}
(window as any).setOnboarded = setOnboarding;