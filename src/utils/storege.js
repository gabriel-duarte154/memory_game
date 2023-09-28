const STOREGE = (function () {
  const _STOREGE = window.localStorage;
  function save(prop, value) {
    _STOREGE.setItem(prop, JSON.stringify(value));
  }

  function get(prop) {
    return JSON.parse(_STOREGE.getItem(prop));
  }

  return {
    save,
    get,
  };
})();

export default STOREGE;
