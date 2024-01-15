FROM ubuntu:20.04
#ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive

#RUN apt --fix-missing update
RUN sed -i 's@archive.ubuntu.com@kr.archive.ubuntu.com@g' /etc/apt/sources.list

RUN apt update -y 
RUN apt upgrade -y
RUN apt install tzdata -y
ENV TZ=Asia/Seoul

#RUN apt-get update -y 
#RUN apt-get upgrade -y 

WORKDIR /celery_Proteomics
COPY celery_Proteomics/ .
#ADD celery_Proteomics/requirements/missForest_1.5.tar.gz .

RUN apt install python3 -y
RUN apt install python3-pip -y
RUN apt install libpq-dev python-dev -y
RUN apt install r-base-core -y
RUN apt install -y r-cran-randomforest
RUN apt install r-bioc-limma -y 
#RUN apt install r-bioc-edger -y
RUN apt install -y r-cran-psych 
RUN apt install -y r-cran-itertools
RUN apt install -y r-cran-dorng
#RUN apt-get install -y r-cran-vim
#RUN apt install -y r-cran-missmda
#RUN apt install -y r-cran-locfit


# missMDA DEPENDENCY

RUN apt install -y r-cran-factominer
RUN apt install -y r-cran-mice

#VIM DEPENDENCY
RUN apt install -y r-cran-vcd

RUN R CMD INSTALL ./requirements/laeken_0.5.2.tar.gz

RUN R CMD INSTALL ./requirements/missForest_1.5.tar.gz
RUN R CMD INSTALL ./requirements/missMDA_1.16.tar.gz
RUN R CMD INSTALL ./requirements/VIM_5.1.0.tar.gz

#vsn DEPENDENCY
RUN R CMD INSTALL ./requirements/affyio_1.52.0.tar.gz
RUN R CMD INSTALL ./requirements/BiocManager_1.30.22.tar.gz
RUN R CMD INSTALL ./requirements/preprocessCore_1.44.0.tar.gz
RUN R CMD INSTALL ./requirements/affy_1.60.0.tar.gz

RUN R CMD INSTALL ./requirements/vsn_3.50.0.tar.gz

RUN R CMD INSTALL ./requirements/locfit_1.5-9.2.tar.gz
RUN R CMD INSTALL ./requirements/edgeR_4.0.5.tar.gz
#RUN R CMD INSTALL ./requirements/tidyverse_2.0.0.tar.gz
#RUN pip install intel-opencl-rt
RUN apt install -y r-cran-tidyverse

RUN pip install -r ./requirements/condaRequirements.txt

#RUN R -e "install.packages(c('missForest'), repos = 'http://cran.us.r-project.org')"
#RUN R -e "install.packages('BiocManager')"
#RUN R -e "BiocManager::install('edgeR')"
    
#RUN R CMD INSTALL ./requirements/missForest_1.5.tar.gz



#RUN python3 manage.py makemigrations
#RUN python3 manage.py migrate





