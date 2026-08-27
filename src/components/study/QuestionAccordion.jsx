import QuestionCard from './QuestionCard'

export default function QuestionAccordion({
  questions,
  openId,
  onToggle,
  revisedIds,
  onToggleRevised,
}) {
  return (
    <div className="question-accordion">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          open={openId === question.id}
          onToggle={() => onToggle(question.id)}
          revised={revisedIds.has(question.id)}
          onToggleRevised={() => onToggleRevised(question.id)}
        />
      ))}
    </div>
  )
}
