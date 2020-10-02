import {Platform} from 'react-native';

const textColor = Platform.OS === 'android' ? 'white' : 'black';

export const country_list = [
    {label: 'Argentina', value: 'Argentina', color: textColor},
    {label: 'Bolivia', value: 'Bolivia', color: textColor},
    {label: 'Chile', value: 'Chile', color: textColor},
    {label: 'Colombia', value: 'Colombia', color: textColor},
    {label: 'Costa Rica', value: 'Costa Rica', color: textColor},
    {label: 'Cuba', value: 'Cuba', color: textColor},
    {label: 'Ecuador', value: 'Ecuador', color: textColor},
    {label: 'El Salvador', value: 'El Salvador', color: textColor},
    {label: 'España', value: 'España', color: textColor},
    {label: 'Estados Unidos', value: 'Estados Unidos', color: textColor},
    {label: 'Guatemala', value: 'Guatemala', color: textColor},
    {label: 'Honduras', value: 'Honduras', color: textColor},
    {label: 'México', value: 'México', color: textColor},
    {label: 'Nicaragua', value: 'Nicaragua', color: textColor},
    {label: 'Panamá', value: 'Panamá', color: textColor},
    {label: 'Paraguay', value: 'Paraguay', color: textColor},
    {label: 'Perú', value: 'Perú', color: textColor},
    {label: 'Puerto Rico', value: 'Puerto Rico', color: textColor},
    {label: 'República Dominicana', value: 'República Dominicana', color: textColor},
    {label: 'Uruguay', value: 'Uruguay', color: textColor},
    {label: 'Venezuela', value: 'Venezuela', color: textColor},
];

export const speciality_list = [
    {label: 'Anatomía patológica', value: 'Anatomía patológica', color: textColor},
    {label: 'Cirugía general y del aparato digestivo', value: 'Cirugía general y del aparato digestivo', color: textColor},
    {label: 'Cirugía ortopédica y traumatología', value: 'Cirugía ortopédica y traumatología', color: textColor},
    {label: 'Hematología y hemoterapia', value: 'Hematología y hemoterapia', color: textColor},
    {label: 'Medicina física y rehabilitación', value: 'Medicina física y rehabilitación', color: textColor},
    {label: 'Medicina intensiva', value: 'Medicina intensiva', color: textColor},
    {label: 'Medicina interna', value: 'Medicina interna', color: textColor},
    {label: 'Medicina nuclear', value: 'Medicina nuclear', color: textColor},
    {label: 'Neurocirugía', value: 'Neurocirugía', color: textColor},
    {label: 'Neurología', value: 'Neurología', color: textColor},
    {label: 'Oncología médica', value: 'Oncología médica', color: textColor},
    {label: 'Oncología radioterápica', value: 'Oncología radioterápica', color: textColor},
    {label: 'Psiquiatría', value: 'Psiquiatría', color: textColor},
    {label: 'Radiodiagnóstico', value: 'Radiodiagnóstico', color: textColor},
    {label: 'Reumatología', value: 'Reumatología', color: textColor},
    {label: 'Urgencias', value: 'Urgencias', color: textColor},
];

export const historial_list = [
    {
        date: '2 de octubre de 2020',
        data: [
            {key: '0005', name: 'audio_02102020_130000.mp4', date: '2 de octubre de 2020', time: '13:00'},
            {key: '0004', name: 'audio_02102020_120000.mp4', date: '2 de octubre de 2020', time: '12:00'}
        ]
    },
    {
        date: '29 de septiembre de 2020',
        data: [
            {key: '0003', name: 'audio_29092020_150100.mp4', date: '29 de septiembre de 2020', time: '15:01'},
            {key: '0002', name: 'audio_29092020_150000.mp4', date: '29 de septiembre de 2020', time: '15:00'},
            {key: '0001', name: 'audio_29092020_130000.mp4', date: '29 de septiembre de 2020', time: '13:00'},
        ]
    },
    {
        date: '28 de septiembre de 2020',
        data: [
            {key: '0000', name: 'audio_28092020_100000.mp4', date: '28 de septiembre de 2020', time: '10:00'},
            {key: '001032', name: 'audio_28092020_090000.mp4', date: '28 de septiembre de 2020', time: '09:00'},
            {key: '001023', name: 'audio_28092020_083400.mp4', date: '28 de septiembre de 2020', time: '08:34'},
            {key: '0010322', name: 'audio_28092020_075600.mp4', date: '28 de septiembre de 2020', time: '07:56'},
        ]
    },
    {
        date: '25 de septiembre de 2020',
        data: [
            {key: '123342', name: 'audio_25092020_100000.mp4', date: '28 de septiembre de 2020', time: '10:00'},
            {key: '12312', name: 'audio_25092020_090000.mp4', date: '28 de septiembre de 2020', time: '09:00'},
            {key: '123443', name: 'audio_25092020_083400.mp4', date: '28 de septiembre de 2020', time: '08:34'},
            {key: '233444', name: 'audio_25092020_075600.mp4', date: '28 de septiembre de 2020', time: '07:56'},
        ]
    },
    {
        date: '22 de septiembre de 2020',
        data: [
            {key: '65467', name: 'audio_22092020_100000.mp4', date: '28 de septiembre de 2020', time: '10:00'},
            {key: '7564', name: 'audio_22092020_090000.mp4', date: '28 de septiembre de 2020', time: '09:00'},
            {key: '4566', name: 'audio_22092020_083400.mp4', date: '28 de septiembre de 2020', time: '08:34'},
            {key: '5646', name: 'audio_22092020_075600.mp4', date: '28 de septiembre de 2020', time: '07:56'},
        ]
    },
];