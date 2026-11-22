import "../styles/FilterGroup.css";

function FilterGroup({
    title,
    inputType = "checkbox",
    options = [],
    selected = [],
    onChange,

}) {
    function handleChange(value, checked) {
        if (!onChange) return;

        if (inputType === "radio") {
            onChange([value]);
            return;
        }

        if (checked) {
            onChange([...selected, value]);
        } else {
            onChange(selected.filter((item) => item !== value));
        }
    }

    return(
        <>
            <fieldset className="filter-group">
                <legend className="filter-group-title">
                    {title}
                </legend>

                <div className="filter-group-options">
                    {options.map((option) => {
                        const value = option.value ?? option.text;

                        return (
                            <label 
                                key={value}
                                className="filter-group-option"
                            >
                                <input 
                                    type={inputType}
                                    name={title}
                                    value={value}
                                    checked={selected.includes(value)}
                                    onChange={(e) =>
                                        handleChange(value, e.target.checked)
                                    }
                                />

                                <span>{option.text}</span>
                            </label>
                        )
                    })}
                </div>
            </fieldset>
        </>
    );
}

export default FilterGroup