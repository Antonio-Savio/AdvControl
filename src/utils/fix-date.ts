export function fixLocalDate(date: Date | string | null){
    if(date){
        const parsedDate = typeof date === "string" ? new Date(date) : date;

        const realDate = new Date(parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000);
        
        return realDate.toLocaleDateString("pt-br")
    }
}