<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BudgetRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=BudgetRepository::class)
 */
class Budget
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"budget"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"budget"})
     */
    private $nomBudget;

    /**
     * @ORM\Column(type="float")
     * @Groups({"budget"})
     */
    private $montantBudget;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"budget"})
     */
    private $categories;

    /**
     * @ORM\ManyToOne(targetEntity=Income::class, inversedBy="budgets")
     */
    private $income;




    

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomBudget(): ?string
    {
        return $this->nomBudget;
    }

    public function setNomBudget(string $nomBudget): self
    {
        $this->nomBudget = $nomBudget;

        return $this;
    }

    public function getMontantBudget(): ?float
    {
        return $this->montantBudget;
    }

    public function setMontantBudget(float $montantBudget): self
    {
        $this->montantBudget = $montantBudget;

        return $this;
    }

    public function getCategories(): ?string
    {
        return $this->categories;
    }

    public function setCategories(string $categories): self
    {
        $this->categories = $categories;

        return $this;
    }

    public function getIncome(): ?Income
    {
        return $this->income;
    }

    public function setIncome(?Income $income): self
    {
        $this->income = $income;

        return $this;
    }

    /** 
    * @Groups({"budget"})
     */
    public function getIncomeId(): ?int
    {
        return $this->income ? $this->income->getId() : null;
    }
}
