import express from "express";
import todoRoute from "./todo.routes";
import authRoute from "./auth.routes";
import userRoute from "./user.routes";

const route = express();

route.use("/auth", authRoute);
route.use("/user", userRoute );
route.use("/todos", todoRoute);

export default route;

/*
    1.create user
        1.endpoint banauni /users/create
        2.create controller banauni
        3.email,name,password cha ki chaina herni
        4. email pailai register cha ki chaina
        5.password lai hash garyo
        6.save garyo

    2.login
        1.user le email ra pw pathauxaaa
        2.email ra pw both check
        3.email bhaako user cha ki nai
        4.hashed password lai compare garni
        5.access token ra refresh token generate garera dini

    3.accesToken creation
        1.secret chaiyo, .env ma raakhni(aalwways)
        2.accessToken ko expiry alwaays < refreshToken
        3.jsonwebToken package
        4. sign garda paayload , secret chaainxa
        5. payload bhaneko dekhaunu milni data

        NOTE:
            jwt banda 3 ta parameter huncha 
            1.algorithm type
            2.payload,
            3.secret key

    3.Authorization middleware
        1.token haru sab frontend ma store huncha
        2.tyo token chai header ma pass garxa during each request
        3.jwt token chai always header ko authorization ma huncha
        4.jwt token store hune way chai "Bearer token"
        req = {
            headers:{
                authorization:"Bearer token"
            },
            body:{
            }
        }
        
    5.tmile login garyo
     1.accessToken return garxa
     2.tya dekhi tei accesstoken matra use hunxa user verify hunu la
*/  