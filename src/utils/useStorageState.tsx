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

export function useStorageState(key: string): Promise<any> {
  try {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        return Promise.resolve(localStorage.getItem(key)).then(value => {
          if (value) {
            return JSON.parse(value);
          }
          return null
        });
      }
    } else {
      return Promise.resolve(AsyncStorage.getItem(key)).then(value => {
        if (value) {
          return JSON.parse(value);
        }
        return null
      });
    }
  } catch (e) {
    console.error("Local storage is unavailable:", e);
  }

  return Promise.reject(null)

}
