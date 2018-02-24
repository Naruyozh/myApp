import { Component } from '@angular/core';
import {
	NavController,
	AlertController,
	LoadingController,
	Loading,
	Platform,
	ToastController
} from 'ionic-angular';

//Diagnostico de nuestro Hardware
import { Diagnostic } from '@ionic-native/diagnostic';

//Geolocalización
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	loading: Loading; //Objeto de carga
	lat: number = 19.257927;
	lng: number = -99.173566;

	constructor(
		public navCtrl: NavController,
		private alertCtrl: AlertController,
		private diagnostic: Diagnostic,
		private geolocation: Geolocation,
		private loadingCtrl: LoadingController,
		private platform: Platform,
		private toastCtrl: ToastController) {	
	}

	//
	//Alerta de carga
private showLoading(){
	this.loading = this.loadingCtrl.create({
		content: 'Por favor espera...',
		dismissOnPageChange: true
	});
	this.loading.present();
}

//Mostrar mensajes toast
private mostrarToast(texto:string){
	this.toastCtrl.create({
		message:texto,
		duration: 3000
	}).present();
}

//Mostrar alerta
private displayMessage(err:string, title:string){
	let alert = this.alertCtrl.create({
		title: title,
		subTitle: err,
		buttons: [
			"Ok"
		]
	});
	alert.present(prompt);
}

//Buscar ubicacion

private buscarUbicacion(){
	//Verificamos si estamos en un celular
	if(!this.platform.is("cordova")){
		this.mostrarToast("No es un celular")
		return;
		//Mostrar mensaje
		this.showLoading()
	}
}

//Verificamos si esta activado el tracker del GPS
this.diagnostic.isLocationEnabled().then(
	(isAvailable) => {
		if(!isAvailable){
			this.loading.dismissAll()
			this.displayMessage('Activa tu GPS' , 'Advertencia');
		} else {
			this.geolocation
			.getCurrentPosition()
			.then(
				(resp) => {
					this.lat = resp.coords.latitude
					this.lng = resp.coords.longitude
					console.log(this.lat)
					console.log(this.lng)
					this.loading.dismissAll()
				}
			) . catch((error) => {
				this.loading.dismissAll()
				this.displayMessage('Ocurrio un error', 'Error interno del sistema')
			});
		}
	}
)

	//
}


