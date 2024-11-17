<?php

namespace App\Entity;

use App\Repository\IncomeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=IncomeRepository::class)
 */
class Income
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"income"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"income"})
     */
    private $mois;

    /**
     * @ORM\Column(type="float")
     * @Groups({"income"})
     */
    private $montantIncome;

    /**
     * @ORM\OneToMany(targetEntity=Budget::class, mappedBy="income", cascade={"remove"})
     */
    private $budgets;

    public function __construct()
    {
        $this->budgets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMois(): ?string
    {
        return $this->mois;
    }

    public function setMois(string $mois): self
    {
        $this->mois = $mois;

        return $this;
    }

    public function getMontantIncome(): ?float
    {
        return $this->montantIncome;
    }

    public function setMontantIncome(float $montantIncome): self
    {
        $this->montantIncome = $montantIncome;

        return $this;
    }

    /**
     * @return Collection<int, Budget>
     */
    public function getBudgets(): Collection
    {
        return $this->budgets;
    }

    public function addBudget(Budget $budget): self
    {
        if (!$this->budgets->contains($budget)) {
            $this->budgets[] = $budget;
            $budget->setIncome($this);
        }

        return $this;
    }

    public function removeBudget(Budget $budget): self
    {
        if ($this->budgets->removeElement($budget)) {
            // set the owning side to null (unless already changed)
            if ($budget->getIncome() === $this) {
                $budget->setIncome(null);
            }
        }

        return $this;
    }
}
