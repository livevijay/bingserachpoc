import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import binqAPI from './Service/binqAPI';
import SearchResult from './Component/SearchResult';
import utility from './Service/utility';
import FormCtrl from './Interface/FormCtrl';

var timer: any;
interface ISearch {
  hasResult: boolean,
  searchKey: FormCtrl<string>,
  suggestions: any,
  searchResult: any,
}
const App: React.FC = () => {

  const [objSearch, bindSearch] = useState<ISearch>({ hasResult: false, suggestions: [], searchResult: [], searchKey: { value: "", validate: { req: true, msg: "Search Keyword" } } });

  useEffect(() => {
    if (timer) { clearTimeout(timer); }
    if (objSearch.searchKey && objSearch.searchKey && objSearch.searchKey.value.length > 2) {
      timer = setTimeout(() => {
        event.onSuggestion();
      }, 400);
    }
    else {
      _App.hideResult();
    }

  }, [objSearch.searchKey.value])
  /**
   * Private App Method
   */
  var _App = {
    /**
     * Show quick suggestion result
     */
    showResult: () => {
      _App.updateResult(true);
    },
    /**
     * Hide quick suggestion result
     */
    hideResult: () => {
      _App.updateResult(false);
    },
    /**
     * Updated Quick Suggestion
     * @param hasResult 
     */
    updateResult: (hasResult: boolean) => {
      _App.setValue("hasResult", hasResult);
    },
    /**
     * Search Object Set Value
     * @param key property name as key
     * @param value property value
     */
    setValue: (key: string, value: any) => {
      bindSearch((prvState: ISearch) => { return { ...prvState, [key]: value } })
    }
  };
  /***
   * App / Page  / Component Event
   */
  var event = {
    /**
     * This method is used for Bing Web Search event
     * @param evt Element Event
     */
    onSearch: (evt: SyntheticEvent) => {
      evt.preventDefault();
      debugger;
      if (utility.validate(objSearch, bindSearch)) {
        binqAPI.search(objSearch.searchKey.value).then((data: any) => {
          if (data && data.webPages && data.webPages.value.length > 0) {
            _App.setValue("searchResult", data.webPages.value);
            _App.hideResult();
          }
        });
      }
    },
    /**
     * This method is used for Autocomplete Suggestion event
     */
    onSuggestion: () => {
      binqAPI.suggestion(objSearch.searchKey.value).then((data: any) => {
        if (data && data.suggestionGroups && data.suggestionGroups.length > 0) {
          _App.setValue("suggestions", data.suggestionGroups[0].searchSuggestions)
        }
        _App.showResult();
      });
    },
    onSearchFocus: () => {
      //TODO On Focus
    },
    /**
     * Bind control value to state object
     * @param evt Event
     */
    bindValue: (evt: any) => {
      const name = evt.target.name;
      bindSearch((prvState: ISearch) => {
        var _new: any = { ...prvState };
        if (typeof (_new[name]) == "object" && "value" in _new[name]) { _new[name].value = evt.target.value; }
        else { _new[name] = evt.target.value; }
        return _new;
      });
    }
  }
  return (
    <div>
      <header className="masthead text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-12 col-xl-7 ">
              <form>
                <div className="formCtrl">
                  <div className="col-12 col-md-12 mb-2 mb-md-0">
                    <input placeholder='Type to search suggestion' onChange={event.bindValue} value={objSearch.searchKey.value} name="searchKey" onFocus={event.onSearchFocus} type="text" className="form-control form-control-lg myform" />
                    <button title='Click here to search web page' className="btn btn-default btnSearch" onClick={event.onSearch}><i className="fa fa-search fa-2x"></i></button>
                    {
                      objSearch.searchKey.isError &&
                      <div className='error'>{objSearch.searchKey.errorMessage}</div>
                    }
                  </div>
                  {
                    objSearch.hasResult &&
                    <div className='quickSuggestion col-12'>
                      {
                        objSearch.suggestions.map((suggestion: any, idx: number) => {
                          return <div key={"lst_" + idx} title={suggestion.searchKind + " - " + suggestion.url} className='col-12 item'><a className='link' target='_blank' href={suggestion.url}>{suggestion.displayText}</a></div>
                        })

                      }
                    </div>
                  }
                </div>
              </form>
            </div>
          </div>
          {
            objSearch.searchResult && objSearch.searchResult.length > 0 &&
            <SearchResult results={objSearch.searchResult} />
          }
        </div>
      </header>

    </div>
  );
}

export default App;
