## Classes

<dl>
<dt><a href="#AuthButton">AuthButton</a></dt>
<dd><p>La clase AuthButton define un componente botón</p></dd>
<dt><a href="#CancelButton">CancelButton</a></dt>
<dd><p>La clase CancelButton define un componente botón</p></dd>
<dt><a href="#DoneButton">DoneButton</a></dt>
<dd><p>La clase DoneButton define un componente botón</p></dd>
<dt><a href="#EditCodeButton">EditCodeButton</a></dt>
<dd><p>La clase EditCodeButton define un componente botón</p></dd>
<dt><a href="#FloatingButton">FloatingButton</a></dt>
<dd><p>La clase FloatingButton define un componente botón</p></dd>
<dt><a href="#ContentMenu">ContentMenu</a></dt>
<dd><p>La clase ContentMenu define el contenido del menú desplegable</p></dd>
</dl>

## Objects

<dl>
<dt><a href="#Alerts">Alerts</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Animations">Animations</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#BackButton">BackButton(navigation)</a></dt>
<dd><p>La clase FloatingButton define un componente botón</p></dd>
</dl>

<a name="AuthButton"></a>

## AuthButton
<p>La clase AuthButton define un componente botón</p>

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| color | <code>colorValue</code> | <p>Color del botón</p> |
| marginTop | <code>number</code> | <p>Margen situado encima del componente</p> |
| marginBottom | <code>number</code> | <p>Margen situado debajo del componente</p> |
| text | <code>string</code> | <p>Texto que se muestra dentro del botón</p> |
| onPress | <code>function</code> | <p>Función que se ejecuta al hacer click</p> |

<a name="new_AuthButton_new"></a>

### new AuthButton()
<p>Este componente es usado en el login y signin para confirmar ambos procesos</p>

<a name="CancelButton"></a>

## CancelButton
<p>La clase CancelButton define un componente botón</p>

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| onPress | <code>function</code> | <p>Función que se ejecuta al hacer click</p> |

<a name="new_CancelButton_new"></a>

### new CancelButton()
<p>Este componente es usado en la pantalla escáner para volver atrás</p>

<a name="DoneButton"></a>

## DoneButton
<p>La clase DoneButton define un componente botón</p>

**Kind**: global class  
<a name="new_DoneButton_new"></a>

### new DoneButton()
<p>Este componente es usado en la pantalla de grabación para confirmar y enviar las notas de voz grabadas a la base de datos</p>

<a name="EditCodeButton"></a>

## EditCodeButton
<p>La clase EditCodeButton define un componente botón</p>

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| onPress | <code>function</code> | <p>Función que se ejecuta al hacer click</p> |

<a name="new_EditCodeButton_new"></a>

### new EditCodeButton()
<p>Este componente es usado en la pantalla de grabación que muestra y permite modificar el código de paciente</p>

<a name="FloatingButton"></a>

## FloatingButton
<p>La clase FloatingButton define un componente botón</p>

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| onPress | <code>function</code> | <p>Función que se ejecuta al hacer click</p> |

<a name="new_FloatingButton_new"></a>

### new FloatingButton()
<p>Este componente es usado en la pantalla principal (home) como botón de añadir más audios</p>

<a name="ContentMenu"></a>

## ContentMenu
<p>La clase ContentMenu define el contenido del menú desplegable</p>

**Kind**: global class  
<a name="Alerts"></a>

## Alerts : <code>object</code>
**Kind**: global namespace  

* [Alerts](#Alerts) : <code>object</code>
    * [.DialogPrompt](#Alerts.DialogPrompt) ⇐ <code>Component</code>
        * [new DialogPrompt()](#new_Alerts.DialogPrompt_new)
        * [.errorMessage](#Alerts.DialogPrompt+errorMessage)
        * [.render()](#Alerts.DialogPrompt+render)

<a name="Alerts.DialogPrompt"></a>

### Alerts.DialogPrompt ⇐ <code>Component</code>
<p>La clase DialogPrompt define el componente que crea un dialog con un textinput</p>

**Kind**: static class of [<code>Alerts</code>](#Alerts)  
**Extends**: <code>Component</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | <p>Valor inicial</p> |
| onChangeText | <code>method</code> | <p>Función que acepta como parámetro el nuevo valor</p> |
| visible | <code>boolean</code> | <p>Muestra el componente o lo mantiene oculto</p> |
| showError | <code>boolean</code> | <p>Muestra el error o lo mantiene oculto</p> |
| onCancel | <code>method</code> | <p>Función que realiza una acción cuando presiona el botón cancelar</p> |
| onAccept | <code>method</code> | <p>Función que realiza una acción cuando presiona el botón aceptar</p> |


* [.DialogPrompt](#Alerts.DialogPrompt) ⇐ <code>Component</code>
    * [new DialogPrompt()](#new_Alerts.DialogPrompt_new)
    * [.errorMessage](#Alerts.DialogPrompt+errorMessage)
    * [.render()](#Alerts.DialogPrompt+render)

<a name="new_Alerts.DialogPrompt_new"></a>

#### new DialogPrompt()
<p>Este componente permite introducir el nuevo nombre para una nota de voz</p>

**Example**  
```js
import { DialogPrompt } from '_alerts';

 ...

 render() {
     return (
         <DialogPrompt 
             value={myValue}
             onChangeText={value => doSomething(value)}
             visible={true}
             showError={false}
             onCancel={() => doSomething()}
             onAccept={() => doSomething()}
         />  
     )
 }

 
```
<a name="Alerts.DialogPrompt+errorMessage"></a>

#### dialogPrompt.errorMessage
<p>Esta función renderiza el error por haber introducido un nombre no válido</p>

**Kind**: instance property of [<code>DialogPrompt</code>](#Alerts.DialogPrompt)  
<a name="Alerts.DialogPrompt+render"></a>

#### dialogPrompt.render()
<p>Renderiza el componente</p>

**Kind**: instance method of [<code>DialogPrompt</code>](#Alerts.DialogPrompt)  
<a name="Animations"></a>

## Animations : <code>object</code>
**Kind**: global namespace  

* [Animations](#Animations) : <code>object</code>
    * [.FadeInAnimation](#Animations.FadeInAnimation)
        * [new FadeInAnimation()](#new_Animations.FadeInAnimation_new)
    * [.HiddenViewAnimation](#Animations.HiddenViewAnimation)
        * [new HiddenViewAnimation()](#new_Animations.HiddenViewAnimation_new)
    * [.RecordAnimation](#Animations.RecordAnimation)
        * [new RecordAnimation()](#new_Animations.RecordAnimation_new)

<a name="Animations.FadeInAnimation"></a>

### Animations.FadeInAnimation
<p>La clase FadeInAnimation define el componente que proporciona una animación con efecto fade-in</p>

**Kind**: static class of [<code>Animations</code>](#Animations)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | <p>Duración de la animación en milisegundos</p> |
| style | <code>styleValue</code> | <p>Diseño visual del componente pasado como un style</p> |

<a name="new_Animations.FadeInAnimation_new"></a>

#### new FadeInAnimation()
<p>Este componente es usado en los items de la lista al aparecer</p>

<a name="Animations.HiddenViewAnimation"></a>

### Animations.HiddenViewAnimation
<p>La clase HiddenViewAnimation define el componente que proporciona una animación con efecto de fade-in y desplazamiento en el eje Y</p>

**Kind**: static class of [<code>Animations</code>](#Animations)  
<a name="new_Animations.HiddenViewAnimation_new"></a>

#### new HiddenViewAnimation()
<p>Este componente es usado en los botones de acción de los items</p>

<a name="Animations.RecordAnimation"></a>

### Animations.RecordAnimation
<p>La clase RecordAnimation define el componente que proporciona la animación que transiciona entre un círculo y un cuadrado, y viceversa</p>

**Kind**: static class of [<code>Animations</code>](#Animations)  
<a name="new_Animations.RecordAnimation_new"></a>

#### new RecordAnimation()
<p>Este componente es usado en el botón de grabación de audios</p>

<a name="BackButton"></a>

## BackButton(navigation)
<p>La clase FloatingButton define un componente botón</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| navigation | <code>Prop</code> | <p>Propiedad de navegación que provee de distintas funciones como moverse entre las distintas pantallas</p> |

