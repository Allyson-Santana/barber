import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStorageItemAsync(key: string, value: string | null): Promise<void> {
  try {
    if (Platform.OS === "web") {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }

    } else {
      if (value == null) {
        AsyncStorage.removeItem(key);
      } else {
        AsyncStorage.setItem(key, value);
      }
    }
  } catch (e) {
    console.error("Local storage is unavailable:", e);
  }
}

export async function useStorageState(key: string): Promise<string | null> {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const value = await Promise.resolve(localStorage.getItem(key))
      return value !== null ? value : null
    }
    else {
      const value = await Promise.resolve(AsyncStorage.getItem(key))
      return value !== null ? value : null
    };
  } catch (e) {
    console.error(`[${Platform.OS}] Local storage is unavailable:`, e);
  }

  return Promise.reject(null)
}


