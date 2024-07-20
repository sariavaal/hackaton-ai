const Card = ({ nombre, tipo, direccion, descripcion }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 w-80 h-80">
      <div className="px-6 py-4">
        <div className="font-bold font-sans text-xl mb-2">{nombre}</div>
        <div className="font-bold font-sans text-slate-500 text-sm mb-2">{tipo}</div>
        <p className="font-sans text-gray-700 text-base">{descripcion}</p>
        <p className="font-sans font-bold text-slate-700 text-sm">{direccion}</p>
      </div>
    </div>
  );
};

export default Card;