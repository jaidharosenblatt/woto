import fetches from "./fetches";
import student from "./student";
import ta from "./ta";
import util from "../../utilfunctions/util";

export default { ...fetches, ...student, ...ta, ...util };
