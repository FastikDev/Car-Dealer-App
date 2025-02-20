import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOffline, setOnline } from "@/src/redux/slises/networkSlice";

const NetworkListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateNetworkStatus = () => 
          dispatch(navigator.onLine ? setOnline() : setOffline());
        
        updateNetworkStatus();

        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);

        return () => {
            window.removeEventListener('online', updateNetworkStatus);
            window.removeEventListener('offline', updateNetworkStatus);
        }
    }, [dispatch]);

    return null;
};

export default NetworkListener;