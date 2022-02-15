import { useState } from 'react';
import axios from 'axios';

const search = async () => {
  const response = await axios.get(
    'http://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=507B275E-09C7-3E67-A02C-B941653D2BDA&emd_kor_nm:like:관양'
  );
  console.log(response);
};

const Search = () => {
  const [area, setArea] = useState('');

  return (
    <div>
      <input
        value={area}
        onChange={(e) => {
          setArea(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          search();
        }}
      >
        검색
      </button>
    </div>
  );
};

export default Search;
