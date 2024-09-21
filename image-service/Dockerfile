FROM openjdk:17-jdk-alpine
COPY target/image-service.jar img-service.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar","img-service-image.jar"]