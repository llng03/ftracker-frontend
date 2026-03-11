import {useState, useEffect, useRef} from 'react'
import './CategorySelect.css'

export function CategorySelect({categories, onChange, onDelete, correctMode}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("default");
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if(containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return() => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="select-container" ref={containerRef}>
            <div className="select-display" onClick={() => setOpen(!open)}>
                {selected}
            </div>
            {open && (
                <div className="dropdown">
                    {categories.map(category => (
                        <div 
                            key={category}
                            className="option"
                            onClick={() => {
                                setOpen(false);
                                setSelected(category);
                                onChange(category);
                            }}
                        >
                            <span>{category}</span>
                            {correctMode && (
                                <button className="delete allow-click" onClick={(e) => {
                                    e.stopPropagation(); 
                                    onDelete(category)}}
                                >x</button>
                            )}
                        </div>  
                    ))}
                </div>
            )}
        </div>
    );

}