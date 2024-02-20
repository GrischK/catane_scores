import styles from "../Test/Test.module.css"
import Sparkles from "../../components/Sparkles/Sparkles";

export default function Test() {

    return (
        <div className={styles.test_container}>
            <Sparkles>
                <button
                >
                    Hello
                </button>
            </Sparkles>
        </div>
    )
}