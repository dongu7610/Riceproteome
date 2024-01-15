FROM ubuntu:20.04
#ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive

#RUN apt --fix-missing update
RUN apt update -y
RUN apt upgrade -y
RUN apt install tzdata -y
ENV TZ=Asia/Seoul


WORKDIR /celery_Proteomics
COPY celery_Proteomics/ .
#ADD celery_Proteomics/requirements/missForest_1.5.tar.gz .


RUN apt install python3 -y
RUN apt install python3-pip -y
RUN apt install libpq-dev python-dev -y
RUN apt install r-base-core -y
RUN apt install -y r-cran-randomforest
RUN apt install r-bioc-limma -y 
RUN apt install -y r-cran-psych 
RUN apt install -y r-cran-itertools
RUN apt install -y r-cran-dorng
RUN R CMD INSTALL ./requirements/missForest_1.5.tar.gz
#RUN pip install intel-opencl-rt
RUN pip install -r ./requirements/condaRequirements.txt

#RUN R -e "install.packages(c('missForest'), repos = 'http://cran.us.r-project.org')"
#RUN R -e "install.packages('BiocManager')"
#RUN R -e "BiocManager::install('edgeR')"
    
#RUN R CMD INSTALL ./requirements/missForest_1.5.tar.gz



#RUN python3 manage.py makemigrations
#RUN python3 manage.py migrate





