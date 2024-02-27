FROM amazoncorretto:17
ARG JAR_FILE=target/*.jar
COPY target/api-0.0.1-SNAPSHOT.jar api-01.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/api-01.jar"]
