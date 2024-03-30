import { COUNTRIES as COUNTRIES_INCLUDING_ALL } from "./countries";
import { AnimatePresence, motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";


export default function CountrySelector({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
  onlyCountries = false,
}) {
  const ref = useRef(null);
  let COUNTRIES = onlyCountries ? COUNTRIES_INCLUDING_ALL.filter((country) => country.value !== "world") : COUNTRIES_INCLUDING_ALL;

  useEffect(() => {
    const mutableRef = ref;

    const handleClickOutside = (event) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target) &&
        open
      ) {
        onToggle();
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const [query, setQuery] = useState("");

  return (
    <div ref={ref} className="mt-2 md:ml-2 md:mt-0 w-[200px] relative">
      <div className="relative">
        <button
          type="button"
          className={`${disabled ? "bg-neutral-100" : "bg-card"
            } relative w-full border border-border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] sm:text-sm`}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={onToggle}
          disabled={disabled}
        >
          <span className="truncate flex items-center">

            <img
              alt={`${selectedValue.value}`}
              src={selectedValue.value === 'world' ? 'https://www.transparentpng.com/thumb/world/gray-world-png-clipart-JHHxzz.png' : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
              className={"inline mr-2 h-4 rounded-sm"}
            />
            {selectedValue.title}
          </span>
          <span
            className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${disabled ? "hidden" : ""
              }`}
          >
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 w-full bg-card shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="sticky top-0 z-10 bg-card">
                <li className=" text-muted-foreground cursor-default select-none focus-none relative py-2 px-3">
                  <input
                    type="search"
                    name="search"
                    autoComplete={"off"}
                    className="bg-card focus:ring-[#10b981] focus:outline-none focus:border-[#10b981] block w-full sm:text-sm rounded-md"
                    placeholder={"Search a country"}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </li>
                <hr />
              </div>

              <div
                className={
                  "max-h-64 no-scrollbar overflow-y-scroll"
                }
              >
                {COUNTRIES.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-muted-foreground cursor-default select-none relative py-2 pl-3 pr-9">
                    No countries found
                  </li>
                ) : (
                  COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase())
                  ).map((value, index) => {
                    return (
                      <li
                        key={`${id}-${index}`}
                        className="text-muted-foreground cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-accent transition"
                        id="listbox-option-0"
                        role="option"
                        onClick={() => {
                          onChange(value.value);
                          setQuery("");
                          onToggle();
                        }}
                      >
                        <img
                          alt={`${value.value}`}
                          src={value.value === 'world' ? 'https://www.transparentpng.com/thumb/world/gray-world-png-clipart-JHHxzz.png' : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                          className={`inline mr-2 h-4 rounded-sm  ${value.value === "world" ? 'ml-1' : ''}`}
                        />

                        <span className={`font-normal truncat`}>
                          {value.title}
                        </span>
                        {value.value === selectedValue.value ? (
                          <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </li>
                    );
                  })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
