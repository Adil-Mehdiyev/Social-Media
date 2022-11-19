import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className=" relative w-full h-full">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />

          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
            
            <div>
              <div className="shadow-2x1">
                <GoogleLogin
                  onSuccess={(response) => {
                    localStorage.setItem("user", JSON.stringify(response));
                    const { name, clientId, imagerUrl } = response;
                    const doc = {
                      _id: clientId,
                      _type: 'user',
                      userName: name,
                      image: imagerUrl,
                    };
                    client.createIfNotExists(doc).then(() => {
                      navigate("/", { replace: true });
                    });
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                ;
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
