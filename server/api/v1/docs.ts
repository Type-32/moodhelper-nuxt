function processNavigation(value: any){
    return (value.value?.at(0)?.children?.at(0)?.children as any)?.sort((a: any, b: any) => {
        const aIsPage = !a.children;
        const bIsPage = !b.children;

        if (aIsPage && !bIsPage) return -1; // a (page) should come before b (directory)
        if (!aIsPage && bIsPage) return 1;  // b (page) should come before a (directory)
        return 0; // No change in order for two items of the same type
    });
}

export default defineEventHandler( async (event) => {
    // return await fetchContentNavigation(queryContent('docs', locale.value))
})