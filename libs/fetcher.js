import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);
//Axios parser the res.data for us

export default fetcher;