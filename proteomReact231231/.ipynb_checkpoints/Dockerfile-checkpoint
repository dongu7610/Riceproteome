FROM ubuntu:20.04 as build
ENV DEBIAN_FRONTEND=noninteractive

RUN apt clean -y
#RUN apt clean 
RUN apt update -y
RUN apt upgrade -y

RUN apt install tzdata -y
ENV TZ=Asia/Seoul

RUN apt install curl -y
ENV NODE_VERSION=16.13.1
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
  && . $HOME/.nvm/nvm.sh\
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default


ENV NODE_PATH /root/.nvm/v$NODE_VERSION/lib/node_modules
ENV PATH /root/.nvm/versions/node/v$NODE_VERSION/bin:$PATH




WORKDIR /loginapp

COPY loginapp/package.json . 

#RUN apt install nodejs -y

#RUN apt install npm -y

RUN apt install git -y

RUN npm install

COPY loginapp/ .

#CMD ["npm","run","build"]
RUN npm run build


FROM nginx:latest

#COPY --from=build /loginapp/nginx-setup.conf /etc/nginx/conf.d/nginx-setup.conf
COPY --from=build /loginapp/nginx-setup.conf /etc/nginx/conf.d/default.conf

COPY --from=build /loginapp/build /usr/share/nginx/html
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
