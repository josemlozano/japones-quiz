export const loadKanaData = async () => {
  try {
    const response = await fetch('/data/kana.json');
    const jsonData = await response.json();

    // Extraer opciones disponibles (hiragana, katakana)
    const availableOptions = Object.keys(jsonData);

    return { jsonData, availableOptions };
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return { jsonData: {}, availableOptions: [] };
  }
};
