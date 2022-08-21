import React, { ChangeEventHandler, useEffect, useState } from "react";
import "./App.css";
import ApiData from "./components/api";

type PropsSearch = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children: string;
};

type UserType = {
  id: number;
  name: string;
};

const getUser = () => {
  return new Promise<UserType>((resolve) => {
    setTimeout(() => {
      resolve({ id: 5, name: "Alexander" });
    }, 900);
  });
};

const Search = ({ value, onChange, children }: PropsSearch): JSX.Element => (
  <div>
    <label htmlFor="search">{children}</label>
    <input id="search" type="text" value={value} onChange={onChange}></input>
  </div>
);

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const loadUser = async () => {
      const user: UserType = await getUser();
      setUser(user);
    };
    loadUser();
  });

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      {user && <h2>Loaded in as {user.name}</h2>}
      <Search value={search} onChange={handlerChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
      <ApiData />
    </div>
  );
}

export default App;
