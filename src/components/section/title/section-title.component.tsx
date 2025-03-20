type SectionTitleProps = {
    pageTitle: string;
    classes?: string;
    subTitle?: string
};
const SectionSubTitle = ({subTitle}: {subTitle:string}) =>{
    return(
        <>
        <p className="mb-5 font-semibold"> {subTitle}</p>
        </>
    )
}

 const SectionTitle = (props: Readonly<SectionTitleProps>) => {
    return (
        <>
        <h1 className={`text-center text-2xl font-bold mb-2 ${props.classes}`}>
        {props.pageTitle}
        </h1>
        {
            props.subTitle ? <SectionSubTitle subTitle= {props.subTitle}></SectionSubTitle> : <></>
        }
        </>
    );
};

export default SectionTitle