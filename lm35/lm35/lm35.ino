//Creamos una variable de tipo entero
int lectura = 0;

//Creamos una variable de tipo flotante
float temperatura = 0.0;

void setup() {
  //Iniciamos la comunicación serial
  Serial.begin(9600);
}

void loop() {
  //Tomamos la lectura analógica del pin al cual conectamos
  //la señal de nuestro sensor
  lectura = analogRead(A0);

  //Obtenemos la temperatura con la siguiente formula:
  temperatura = (( lectura * (500.0 / 1023.0)) );
  
  //Imprimimos por monitor serie la temperatura en celcius 
  Serial.println(temperatura);

  delay(1000);
}
