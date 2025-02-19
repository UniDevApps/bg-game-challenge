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

type Ball = {
    src: string,
    buyed: boolean,
    price: number
}
const ballsStorage = await store.get<Ball[]>("balls");
export const selectedBall = writable<number>(0)
export const balls = writable<Ball[]>(ballsStorage != undefined ? ballsStorage : [
    {
        src: "/sprites/chaseplane/plane_1.png",
        buyed: true,
        price: 0
    },
    {
        src: "/sprites/chaseplane/plane_2.png",
        buyed: false,
        price: 100
    },
    {
        src: "/sprites/chaseplane/plane_3.png",
        buyed: false,
        price: 300
    },
    {
        src: "/sprites/chaseplane/plane_4.png",
        buyed: false,
        price: 500
    },
]);

export const buyBall = (index: number) => {
    balls.update((balls) => {
        wallet.update((value) => {
            if (value >= balls[index].price) {
                value -= balls[index].price;
                store.set("wallet", value);
                balls[index].buyed = true;
                store.set("balls", balls);
            }
            return value
        })
        return balls
    })
}

type Plane = {
    src: string,
    buyed: boolean,
    price: number
}
const planeStorage = await store.get<Plane[]>("plane");
export const selectedPlane = writable<number>(0)
export const planes = writable<Plane[]>(planeStorage != undefined ? planeStorage : [
    {
        src: "/sprites/chaseplane/plane_1.png",
        buyed: true,
        price: 0
    },
    {
        src: "/sprites/chaseplane/plane_2.png",
        buyed: false,
        price: 100
    },
    {
        src: "/sprites/chaseplane/plane_3.png",
        buyed: false,
        price: 300
    },
    {
        src: "/sprites/chaseplane/plane_1.png",
        buyed: false,
        price: 500
    },
]);

export const buyPlane = (index: number) => {
    planes.update((planes) => {
        wallet.update((value) => {
            if (value >= planes[index].price) {
                value -= planes[index].price;
                store.set("wallet", value);
                planes[index].buyed = true;
                store.set("plane", planes);
            }
            return value
        })
        return planes
    })
}