import styles from "./BoardPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BoardCard } from "../../components/BoardCard/BoardCard";

export const BoardPage = () => {
  return (
    <main className={`${styles.boardContent} pt-2`}>
      <section className={`${styles.boardsList} mb-6`}>
        <BoardCard>
          <div className={styles.createBoard}>
            <span className="mr-2">Create new board</span>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </BoardCard>
      </section>
      <section className={`${styles.boardConstructor} mb-6`}>
        <h1 className="text-xl font-medium mb-4">My Board</h1>
        <div className={styles.constructorList}>
          <BoardCard>
            <div className={styles.cardContent}>
              <h4 className="font-normal text-lg mb-3">To Do</h4>
              <FontAwesomeIcon icon={faEllipsis} className={styles.cardIcon} />
              <span className={`${styles.cardInfo} pt-2 pb-3 pl-2`}>
                Для todo которые нужно сделать
              </span>
            </div>
          </BoardCard>
          <button className={styles.addColumn}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add another constructorList</span>
          </button>
        </div>
      </section>
      <section className={styles.popularBoards}>
        <h2 className="text-xl font-medium mb-2">Popular templates</h2>
        <p className="text-sm font-normal mb-7">
          Get doing faster with a template from the Trello community
        </p>
        <div className={styles.templatesList}></div>
      </section>
    </main>
  );
};
