# Trabajo de fin de grado

Aplicación multiplataforma creada con React Native.


## Requisitos previos

1. Tener instalado NodeJS. Si no ejecutar el siguiente comando en la terminal:

```
sudo apt-get install nodejs
```

Con este comando, entre otras cosas, se instalará el gestor de paquetes NPM.

2. Instalar React Native:

```
npm install -g react-native-cli
```

3. Tener instalado Java y AndroidStudio para poder ejecutar el proyecto en un simulador de dispositivo Android.

4. Para poder ejecutarlo en iOS será necesario tener un ordenador Apple con el programa XCode para poder simular la aplicación.


## Guía de instalación

1. Descargar el proyecto.

2. Entrar en la carpeta del proyecto.

3. Ejecutar el siguiente comando para instalar las dependencias:

```

npm install
```

5. Para simular en iOS, ejecutar previamente este comando en la carpeta ios del proyecto.

```
pod install
```

## Simular en Android

Ejecuta en un simulador.

```
react-native run-android
```

Ejecuta en un dispositivo real.

```
react-native run-ios --device "<nombre>"
```

## Simular en iOS

Ejecuta en un simulador.

```
react-native run-ios
```

Ejecuta en un dispositivo real.

```
react-native run-ios --device "iPhone de <nombre>"
```