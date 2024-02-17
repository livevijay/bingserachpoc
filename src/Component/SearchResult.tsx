import React from 'react';
import "./SearchResult.css"
/**
 * Binq web page search result
 * @param probs Expect search result in results property as array
 * @returns 
 */
function SearchResult(probs: any) {
    return (
        <div className='searchList'>{
            probs.results.map((item: any, idx: number) => {
                return <div key={"rslt_" + idx} className='row searchItem'>
                    <a title={item.name } className='parent' target='_blank' href={item.url}>
                        <div className='col-12'>
                            <a href={item.url} target='_blank'>{item.displayUrl}</a>
                        </div>
                        <div className='col-12'>
                            {item.snippet}
                        </div>
                    </a>
                </div>
            })}
        </div>
    )
}
export default SearchResult;