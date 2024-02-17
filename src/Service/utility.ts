/**
 * This utility is used for smooth / common functionality for this application
 * like Validation, Convertion, Environment Data etc...
 */
const utility = {
    /**
     * 
     * @param source - Get Object
     * @param setSource - Set Object
     * @returns validate result success / failed
     */
    validate: (source: any, setSource: any): boolean => {
        var _keys = Object.keys(source);
        var _rslt: boolean = true;
        _keys.forEach(key => {
            var item = source[key];
            if (item && typeof (item) == "object" && "validate" in item) {
                var updateVal: any = { isError: false, errorMessage: "" };
                //Req Validation
                if (item.validate.req && item.value == "") {
                    _rslt = false;
                    updateVal.isError = true;
                    updateVal.errorMessage = item.validate.msg + " is required";
                }
                //TODO remainig validation like minlen, maxlen, email, numberonly, min, max etc...
                setSource((prevVal: any) => {
                    var _new = { ...prevVal };
                    _new[key].isError = updateVal.isError;
                    _new[key].errorMessage = updateVal.errorMessage;
                    return _new;
                });
            }
        });
        return _rslt;
    }
}

export default utility