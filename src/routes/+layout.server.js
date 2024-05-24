export const load = async (event) => {
    return {
        // @ts-ignore
        session: event.locals.session,
        // @ts-ignore
        user: event.locals.user
    };
};