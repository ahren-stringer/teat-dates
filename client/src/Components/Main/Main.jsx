import AddingForm from "../AddingForm/AddingForm";
import ProjectsList from "../ProjectsList/ProjectsList";

function Main() {
    return (
        <>
            <div style={{
                minWidth: '300px',
                height: '100vh',
            }}>
                <ProjectsList />
            </div>
            <AddingForm />
        </>
    );
}

export default Main;
