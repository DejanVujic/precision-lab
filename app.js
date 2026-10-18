/* Calculation uses integer micrometres to avoid floating-point boundary errors.
   This learning demo accepts up to three decimal places in millimetres. */
function parseMillimetres(text) {
  const value = String(text).trim().replace(',', '.');
  if (!/^[+-]?\d+(?:\.\d{1,3})?$/.test(value)) return null;
  const micrometres = Math.round(Number(value) * 1000);
  return Number.isSafeInteger(micrometres) && Math.abs(micrometres) <= 1000000000 ? micrometres : null;
}
function calculate(nominal, lower, upper, actual) {
  if (![nominal, lower, upper, actual].every(Number.isSafeInteger)) throw new Error('Ungültige Zahlen.');
  if (nominal <= 0 || actual < 0 || nominal + lower < 0) throw new Error('Nennmaß muss positiv sein; Istmaß und Mindestmaß dürfen nicht negativ sein.');
  if (upper <= lower) throw new Error('Das obere Abmaß muss größer als das untere Abmaß sein.');
  const minimum = nominal + lower;
  const maximum = nominal + upper;
  return {minimum, maximum, width: maximum - minimum, deviation: actual - nominal,
    inside: actual >= minimum && actual <= maximum,
    distance: actual < minimum ? minimum - actual : actual > maximum ? actual - maximum : Math.min(actual - minimum, maximum - actual)};
}
if (typeof module !== 'undefined') module.exports = { parseMillimetres, calculate };
if (typeof document !== 'undefined') {
  const form = document.querySelector('#check-form');
  const format = number => (number / 1000).toLocaleString('de-DE', {minimumFractionDigits:3,maximumFractionDigits:3,useGrouping:false});
  const set = (id, value) => document.getElementById(id).textContent = value;
  function render() {
    const values = ['nominal','lower','upper','actual'].map(id => parseMillimetres(document.getElementById(id).value));
    try {
      if (values.includes(null)) throw new Error('Bitte alle Felder als Zahl mit maximal drei Nachkommastellen eingeben (z. B. 25,012). Maximalbetrag: 1.000.000 mm.');
      const [nominal,lower,upper,actual] = values;
      const result = calculate(...values);
      set('error',''); document.getElementById('result').hidden = false;
      document.querySelector('.result-panel').classList.toggle('outside',!result.inside);
      set('status', result.inside ? '● INNERHALB DER TOLERANZ' : '● AUSSERHALB DER TOLERANZ');
      set('result-title',result.inside ? 'Das Maß passt.' : 'Das Maß weicht ab.');
      set('explanation',result.inside ? 'Das gemessene Istmaß liegt im zulässigen Bereich, einschließlich der Grenzen.' : 'Das gemessene Istmaß liegt außerhalb der eingegebenen Grenzmaße.');
      set('minimum',format(result.minimum)+' mm'); set('maximum',format(result.maximum)+' mm');
      set('width',format(result.width)+' mm'); set('measured',format(actual)+' mm');
      set('scale-min',format(result.minimum)); set('scale-max',format(result.maximum));
      const position = 20 + ((actual-result.minimum)/result.width)*60;
      document.getElementById('marker').style.left = Math.max(0,Math.min(100,position))+'%';
      set('deviation','Abweichung vom Nennmaß: '+(result.deviation>0?'+':'')+format(result.deviation)+' mm · '+(result.inside?'Abstand zur nächsten Grenze: ':'Abstand zum zulässigen Bereich: ')+format(result.distance)+' mm'+(position<0||position>100?' · Marker am Skalenrand begrenzt.':''));
      set('formula',`Mindestmaß = ${format(nominal)} + (${format(lower)}) = ${format(result.minimum)} mm\nHöchstmaß = ${format(nominal)} + (${format(upper)}) = ${format(result.maximum)} mm`);
    } catch(error) {set('error',error.message); document.getElementById('result').hidden = true;}
  }
  form.addEventListener('submit',event=>{event.preventDefault();render();});
  const examples={inside:['25,000','-0,020','0,020','25,012'],edge:['25,000','-0,020','0,020','25,020'],outside:['25,000','-0,020','0,020','25,035']};
  document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>{['nominal','lower','upper','actual'].forEach((id,index)=>{document.getElementById(id).value=examples[button.dataset.example][index];});render();}));
  render();
}
