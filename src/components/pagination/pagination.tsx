import { useEffect } from "react";
import { Button } from "../Button/Button";


export const Pagination = ({list, itemInPage, setPagination, className}: any) => {
    const pagenumbers: number = Math.ceil(list.length / itemInPage);
    let pagesBtn: any[] = []

    const paginationHandler = (btnNumber: number) => {
        const array = []
        const end = btnNumber * itemInPage
        const first = end - itemInPage;
        for(let i = first; i < end; i++){
            list[i] && array.push(list[i])
        }
        
        setPagination([...array])
    }

    for(let i: number = 1 ; i <= pagenumbers ; i++){
        if(pagenumbers > 1) pagesBtn = [...pagesBtn, <Button key={i} onClick={() => paginationHandler(i)} className="p-[7px] m-[2px] border-none rounded-sm bg-[#E6E4E4] text-black cursor-pointer active:bg-[#D5D1D1] " >{i}</Button>]
    }

    useEffect(() => {
        paginationHandler(1)
    }, [])
    
    return(
        <div className={className}>
            <div className="text-center" >
                {pagesBtn}
            </div>
        </div>
    )
}